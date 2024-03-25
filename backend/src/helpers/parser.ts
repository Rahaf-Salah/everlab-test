import { Hl7Parser } from "@manhydra/hl7-parser";
var hl7Parser = new Hl7Parser();

export const getData = (hl7Message: string, type: string) => {
	const hl7Model = hl7Parser.getHl7Model(hl7Message);

	if (hl7Model) {
		// Filter first by type then return what we need
		return hl7Model.children
			.filter((child) => child?.name === type)
			.map((hl7) => ({
				name: hl7.children[3]?.children?.[1].value,
				value: hl7.children[5]?.value,
				unit: hl7.children[6]?.value.split("^")?.[0],
			}));
	}

	return [];
};
