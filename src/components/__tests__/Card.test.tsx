import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { i18ObjectPath } from "proxy-object-path";
import noImage from "../../assets/no-image.svg";
import i18n from "../../translations/i18n";
import lang from "../../translations/lang";
import { MockedProviders } from "../../__tests__/mocks";
import { Card } from "../Card";

const description = "<description uniquie text>";
const imageUrl = "image url";
const label = "<label unique text>";
const notAvailableInfo = "not available info";
const title = "title";

describe("Card", () => {
	it("Should render all passed fields", () => {
		render(
			<MockedProviders>
				<Card
					description={description}
					imageUrl={imageUrl}
					label={label}
					notAvailableInfo={notAvailableInfo}
					title={title}
				/>
			</MockedProviders>
		);

		expect(screen.queryByRole("img")).toHaveAttribute("src", imageUrl);
		expect(screen.queryByRole("heading")).toHaveTextContent(title);
		expect(screen.getByText(description)).not.toBeUndefined();
		expect(screen.getByText(label)).not.toBeUndefined();
		expect(screen.queryByRole("button")).toHaveTextContent(
			i18n.t(i18ObjectPath(lang.card.borrow))
		);
	});

	it("Should render fallback image", () => {
		render(
			<MockedProviders>
				<Card
					description={description}
					label={label}
					notAvailableInfo={notAvailableInfo}
					title={title}
				/>
			</MockedProviders>
		);

		expect(screen.queryByRole("img")).toHaveAttribute("src", noImage);
	});
});
