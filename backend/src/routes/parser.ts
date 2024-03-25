import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { getData } from "../helpers/parser";
import prismaClient from "../helpers/prisma";

const router = express.Router();
const upload = multer({ dest: "files/" });

router.post("/", upload.single("file"), async (req, res) => {
	const file = fs.readFileSync(path.join(__dirname, "../..", req.file?.path!));

	const obxData = getData(file.toString(), "OBX");
	const diagnosticMetrics = await prismaClient.diagnosticMetric.findMany({
		include: {
			condition: true,
		},
	});
	const diagnostics = await prismaClient.diagnostic.findMany({
		include: {
			diagnosticGroup: true,
		},
	});

	const risks: any[] = [];
	obxData.forEach((data) => {
		const diagnosticMetric = diagnosticMetrics.find(
			(metric) =>
				metric.oruSonicCodes?.split(";").includes(data.name) &&
				metric.oruSonicUnits === data.unit
		);
		if (diagnosticMetric) {
			const low = Number(diagnosticMetric.standardLow);
			const high = Number(diagnosticMetric.standardHigh);
			const value = Number(data.value);
			if (value < low || value > high) {
				const diagnostic = diagnostics.find(
					(d) => d.id === diagnosticMetric.diagnosticId
				)!;
				risks.push({
					name: data.name,
					diagnostic: diagnostic.name,
					group: diagnostic.diagnosticGroup.name,
					value: data.value,
					unit: data.unit,
					low,
					high,
					conditions: diagnosticMetric.condition?.map(
						(condition) => condition.name
					),
				});
			}
		}
	});

	return res.json({
		risks,
	});
});

export default router;
