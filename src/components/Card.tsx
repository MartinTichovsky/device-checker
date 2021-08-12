import {
  ButtonLayout,
  Description,
  Image,
  Label,
  NotAvailable,
  CardStyled,
  Title,
} from "./Card.styles";
import noImage from "../assets/no-image.svg";
import { useTranslation } from "react-i18next";
import { i18ObjectPath } from "proxy-object-path";
import lang from "../translations/lang";

interface OwnProps {
  description?: string;
  imageUrl?: string;
  label?: string;
  notAvailableInfo?: string;
  title: string;
}

export const Card = ({
  description,
  imageUrl,
  label,
  notAvailableInfo,
  title,
}: OwnProps) => {
  const { t } = useTranslation();

  return (
    <CardStyled>
      <Image src={imageUrl || noImage} />
      {notAvailableInfo && (
        <NotAvailable>
          <span>{notAvailableInfo}</span>
        </NotAvailable>
      )}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {label && <Label>{label}</Label>}
      <ButtonLayout>
        <button disabled={notAvailableInfo !== undefined}>
          {t(i18ObjectPath(lang.card.borrow))}
        </button>
      </ButtonLayout>
    </CardStyled>
  );
};
