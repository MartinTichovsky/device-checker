import { JSONSchema7, JSONSchema7Definition } from "json-schema";

// TODO: solution doesn't include `additionalProperties` functionality
export class Validator<T> {
  constructor(private schema: JSONSchema7, private data: T) {
    if (!this.isObject(this.schema) || Array.isArray(this.schema)) {
      throw "Schema must be an object";
    }
  }

  get errors(): string[] {
    return this._errors;
  }

  private _errors: string[] = [];

  private containsAllRequiredProperties<T>(
    schema: JSONSchema7,
    data: T
  ): string[] {
    if (!schema?.required) return [];
    const errors: string[] = [];

    for (const property of schema.required) {
      if (!data || (this.isObject(data) && data[property] === undefined)) {
        errors.push(`Missing required property '${property}'`);
      }
    }

    return errors;
  }

  private checkInnerSchema<T>(
    schema: JSONSchema7,
    data: T,
    propertyName = ""
  ): string[] {
    let errors: string[] = [];

    if (schema?.properties) {
      errors = errors.concat(
        this.checkAllProperties(schema, data, propertyName)
      );
    } else if (
      schema?.anyOf &&
      !this.checkAnyOf(schema.anyOf, data, propertyName)
    ) {
      errors.push(
        `Data ${propertyName && `in '${propertyName}' `}doesn't match anyOf`
      );
    } else if (
      schema?.type &&
      !this.checkPropertyValueType(schema?.type, data)
    ) {
      errors.push(`Data doesn't match the definition`);
    }

    return errors;
  }

  private checkAllProperties<T>(
    schema: JSONSchema7,
    data: T,
    propertyName: string
  ): string[] {
    let errors = this.containsAllRequiredProperties(schema, data);

    if (schema?.type && !this.checkPropertyValueType(schema?.type, data)) {
      errors.push(
        `Data ${
          propertyName && `in '${propertyName}' `
        }doesn't match the definition`
      );
    }

    if (!schema.properties) {
      return errors;
    }

    for (const key in schema.properties) {
      if (
        !schema.properties[key] ||
        this.isBoolean(schema.properties[key]) ||
        (this.isObject(data) && !(key in data))
      ) {
        continue;
      }

      const propertySchema = schema.properties[key] as JSONSchema7;
      const trueSchema = propertySchema.$ref
        ? this.getSchemaByRef(propertySchema.$ref)
        : propertySchema;

      if (this.isObject(data) && key in data) {
        errors = errors.concat(this.checkProperty(trueSchema, key, data[key]));
      }

      errors = errors.concat(
        this.checkInnerSchema(
          trueSchema,
          (this.isObject(data) && key in data ? data[key] : {}) as Record<
            string,
            unknown
          >
        )
      );

      if (
        trueSchema.items &&
        !this.isBoolean(trueSchema.items) &&
        trueSchema?.type === "array" &&
        this.isObject(data)
      ) {
        errors = errors.concat(
          this.checkItems(trueSchema.items, data[key] || [], key)
        );
      }
    }

    return errors;
  }

  private checkAnyOf<T>(
    anyOf: JSONSchema7Definition[],
    data: T,
    propertyName: string
  ): boolean {
    for (const schema of anyOf) {
      if (
        !this.isBoolean(schema) &&
        this.checkAllProperties(schema, data, propertyName).length === 0
      ) {
        return true;
      }
    }
    return false;
  }

  private checkItems<T>(
    items: JSONSchema7 | JSONSchema7Definition[],
    data: T,
    propertyName: string
  ): string[] {
    if (!Array.isArray(data)) {
      return [];
    }

    items = Array.isArray(items) ? items : [items];

    let errors: string[] = [];

    for (let i = 0; i < data.length; i++) {
      for (const schema of items) {
        if (this.isBoolean(schema)) continue;

        if (!this.checkPropertyValueType(schema?.type, data[i])) {
          errors.push(
            `Item in '${propertyName}[${i}]' doesn't match the definition`
          );
        }

        errors = errors.concat(this.checkInnerSchema(schema, data[i]));

        if (
          schema.items &&
          !this.isBoolean(schema.items) &&
          schema?.type === "array"
        ) {
          errors.concat(
            this.checkItems(
              schema.items,
              data[i] || [],
              `${propertyName}[${i}]`
            )
          );
        }
      }
    }

    return errors;
  }

  private checkProperty<T>(
    schema: JSONSchema7,
    propertyName: string,
    propertyValue: T
  ): string[] {
    const errors: string[] = [];
    if (
      schema?.type &&
      !this.checkPropertyValueType(schema?.type, propertyValue)
    ) {
      errors.push(`Property '${propertyName}' doesn't match the definition`);
    }
    return errors;
  }

  private checkPropertyValueType<T>(
    propertySchemaType: string | string[] | undefined | false,
    propertyValue: T
  ): boolean {
    if (!propertySchemaType) {
      return false;
    }
    if (propertyValue === undefined) {
      return true;
    }

    const types =
      typeof propertySchemaType === "string"
        ? [propertySchemaType]
        : propertySchemaType;

    return types.some((type) => {
      switch (type) {
        case "array":
          return Array.isArray(propertyValue);
        case "boolean":
          return this.isBoolean(propertyValue);
        case "null":
          return propertyValue === null;
        case "integer":
          return Number.isInteger(propertyValue);
        case "number":
          return typeof propertyValue === "number";
        case "object":
          return this.isObject(propertyValue) && !Array.isArray(propertyValue);
        case "string":
          return typeof propertyValue === "string";
        default:
          return true;
      }
    });
  }

  private getSchemaByRef(ref: string): JSONSchema7 {
    const match = new RegExp(/^#\/definitions\/(\w+)$/).exec(ref);
    if (
      match &&
      this.schema.definitions &&
      match[1] in this.schema.definitions &&
      this.schema.definitions[match[1]]
    ) {
      return this.schema.definitions[match[1]] as JSONSchema7;
    } else {
      this._errors.push(`Reference '${ref}' haven't been found`);
    }
    return {};
  }

  private isBoolean<T>(data: T | boolean): data is boolean {
    return typeof data === "boolean";
  }

  private isObject<T>(
    data: T | Record<string, unknown>
  ): data is Record<string, unknown> {
    return typeof data === "object" && data !== null;
  }

  validate(): boolean {
    this._errors = this._errors.concat(
      this.checkInnerSchema(this.schema, this.data)
    );
    return this._errors.length === 0;
  }
}
