import { JSONSchema7 } from "json-schema";
import { Validator } from "../validator";
import advanceSchema from "./schema-example-advance.json";
import simpleSchema from "./schema-example-simple.json";
import schema from "./schema.json";

type Type = {
  schema: JSONSchema7;
  values: any[];
};

type Types = {
  [key: string]: Type;
};

const types: Types = {
  array: {
    schema: {
      type: "array",
      $schema: "http://json-schema.org/draft-07/schema#",
    },
    values: [[], [1, 2], ["a", 2], [NaN, false, null]],
  },
  boolean: {
    schema: {
      type: "boolean",
      $schema: "http://json-schema.org/draft-07/schema#",
    },
    values: [true, false],
  },
  integer: {
    schema: {
      type: "integer",
      $schema: "http://json-schema.org/draft-07/schema#",
    },
    values: [0, 1, 999],
  },
  null: {
    schema: {
      type: "null",
      $schema: "http://json-schema.org/draft-07/schema#",
    },
    values: [null],
  },
  number: {
    schema: {
      type: "number",
      $schema: "http://json-schema.org/draft-07/schema#",
    },
    values: [0.2, 1.999, 999.99],
  },
  object: {
    schema: {
      type: "object",
      $schema: "http://json-schema.org/draft-07/schema#",
    },
    values: [{}, { something: 1 }, { "any-thing": false }],
  },
  string: {
    schema: {
      type: "string",
      $schema: "http://json-schema.org/draft-07/schema#",
    },
    values: ["", "aa", " "],
  },
};

describe("Validation", () => {
  it("Must throw an error", () => {
    expect(() => new Validator([] as any, {})).toThrowError();
    expect(() => new Validator(1 as any, {})).toThrowError();
    expect(() => new Validator("" as any, {})).toThrowError();
    expect(() => new Validator(null as any, {})).toThrowError();
    expect(() => new Validator(true as any, {})).toThrowError();
  });

  describe("Simple types", () => {
    for (const key in types) {
      describe(`Simple type - ${key}`, () => {
        it("Should pass", () => {
          for (const value of types[key].values) {
            expect(new Validator(types[key].schema, value).validate()).toBe(
              true
            );
          }
        });

        for (const other of Object.keys(types).filter(
          (item) => item !== key && !(key === "number" && item === "integer")
        )) {
          it(`Should not be ${other}`, () => {
            for (const value of types[other].values) {
              expect(new Validator(types[key].schema, value).validate()).toBe(
                false
              );
            }
          });
        }
      });
    }
  });

  it("Required properties", () => {
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
      }).validate()
    ).toBe(true);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [{ from: "", till: "" }],
        daysOffset: "",
      }).validate()
    ).toBe(true);

    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [{}],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [{ fromm: "", till: "" }],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [{ from: "", till: "" }, { from: "" }],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(new Validator(advanceSchema as JSONSchema7, {}).validate()).toBe(
      false
    );
  });

  it("Undefined", () => {
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        businessHours: undefined,
      }).validate()
    ).toBe(true);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        credentials: undefined,
        daysOffset: "",
      }).validate()
    ).toBe(true);

    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: undefined,
      }).validate()
    ).toBe(false);
  });

  describe("Check type", () => {
    const types: {
      [key: string]: any[];
    } = {
      array: [[], []],
      boolean: [true, false],
      integer: [0, 1, 2],
      number: [55.5, 1.5],
      object: [{}, {}],
      string: ["", " ", "A"],
      null: [null],
    };
    for (const key1 in types) {
      for (const key2 in types) {
        for (const value of types[key2]) {
          it(`${key1} must${
            key1 !== key2 ? "n't" : ""
          } match to "${JSON.stringify(value)}"`, () => {
            expect(
              new Validator(simpleSchema as JSONSchema7, {
                [key1]: value,
              }).validate()
            ).toBe(key1 === key2 || (key1 === "number" && key2 === "integer"));
          });
        }
      }
    }
  });

  it("Check multiple types", () => {
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        days: "string",
        daysOffset: "",
      }).validate()
    ).toBe(true);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        days: 2,
        daysOffset: "",
      }).validate()
    ).toBe(true);

    expect(
      new Validator(advanceSchema as JSONSchema7, {
        days: null,
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        days: true,
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        days: {},
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        days: [],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        days: null,
        daysOffset: "",
      }).validate()
    ).toBe(false);
  });

  it("Check array", () => {
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: [],
      }).validate()
    ).toBe(true);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: ["item", "item"],
      }).validate()
    ).toBe(true);

    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: [0],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: [false],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: [{}],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: [[]],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: ["item", 1],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: ["item", true],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: ["item", {}],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: ["item", []],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        disabledWeekdays: ["item", null],
      }).validate()
    ).toBe(false);
  });

  it("Items in array", () => {
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [],
        daysOffset: "",
      }).validate()
    ).toBe(true);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [
          { from: "", till: "" },
          { from: "", till: "" },
        ],
        daysOffset: "",
      }).validate()
    ).toBe(true);

    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [{ fromm: "", till: "" }],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [
          { from: 1, till: "" },
          { from: "", till: 1 },
        ],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [{ from: false, till: "" }],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [{ from: {}, till: "" }],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [{ from: [], till: "" }],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [
          { from: "", till: "" },
          { from: 1, till: "" },
        ],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [
          { from: "", till: "" },
          { from: "", till: true },
        ],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [
          { from: "", till: "" },
          { from: "", till: {} },
        ],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [
          { from: "", till: "" },
          { from: "", till: true },
        ],
        daysOffset: "",
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        businessHours: [
          { from: "", till: "" },
          { from: "", till: null },
        ],
        daysOffset: "",
      }).validate()
    ).toBe(false);
  });

  it("AnyOf", () => {
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        credentials: "",
      }).validate()
    ).toBe(true);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        credentials: {
          username: "",
          password: "",
        },
      }).validate()
    ).toBe(true);

    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: 1,
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: true,
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: [],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: [1],
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: {
          username: 1,
          password: "",
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: {
          username: false,
          password: "",
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: {
          usernam: "",
          password: "",
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: {
          username: [],
          password: "",
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: {
          usernam: {},
          password: "",
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "",
        credentials: {
          usernam: null,
          password: "",
        },
      }).validate()
    ).toBe(false);
  });

  it("Reference", () => {
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {
          tenant_technical: {
            application: "",
            tenant: "",
          },
        },
      }).validate()
    ).toBe(true);

    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {},
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {
          tenant_technical: {},
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {
          tenant_technical: {
            applicatio: "",
            tenant: "",
          },
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {
          tenant_technical: {
            application: 1,
            tenant: "",
          },
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {
          tenant_technical: {
            application: true,
            tenant: "",
          },
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {
          tenant_technical: {
            application: [],
            tenant: "",
          },
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {
          tenant_technical: {
            application: {},
            tenant: "",
          },
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {
          tenant_technical: {
            application: 1,
            tenant: "",
          },
        },
      }).validate()
    ).toBe(false);
    expect(
      new Validator(advanceSchema as JSONSchema7, {
        daysOffset: "string",
        configurations: {
          tenant_technical: {
            application: null,
            tenant: "",
          },
        },
      }).validate()
    ).toBe(false);
  });
});
