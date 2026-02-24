import { DataSource } from 'typeorm';
import { Prediction } from '../entities/prediction.entity';
import { PredictionData } from '../entities/prediction-data.entity';
import { AreaPrediction } from '../entities/area-prediction.entity';

export class PredictionSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const predictionRepo = this.dataSource.getRepository(Prediction);
    const predictionDataRepo = this.dataSource.getRepository(PredictionData);
    const areaPredictionRepo = this.dataSource.getRepository(AreaPrediction);

    const exists = await predictionRepo.count();
    if (exists > 0) {
      console.log('Prediction table is not empty. Skipping seed.');
      return;
    }

    const predictions: Prediction[] = [];

    for (let i = 0; i < 100; i++) {
      const p = new Prediction();

      const now = new Date();

      // predictionDate rule
      p.predictionDate = new Date(now.getFullYear(), now.getMonth(), 1);

      // Random foreign keys
      p.domain = { id: this.rand(1, 8) } as any;
      p.predictionStatus = { id: this.rand(1, 4) } as any;
      p.impactLevel = { id: this.rand(1, 3) } as any;

      p.startDate = now;
      p.endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      p.confidenceScore = Math.round(Math.random() * 100);
      p.createdBy = 1;
      p.lastModifiedBy = 1;

      predictions.push(p);
    }

    const savedPredictions = await predictionRepo.save(predictions);
    console.log('Inserted predictions:', savedPredictions.length);

    // ----------------------------------------------------
    // Insert PredictionData for each prediction (Vi + En)
    // ----------------------------------------------------
    const dataList: PredictionData[] = [];

    for (const p of savedPredictions) {
      // Vietnamese (1)
      const vn = new PredictionData();
      vn.prediction = p;
      vn.language = { id: 1 } as any;
      vn.title = `Dự đoán #${p.id}`;
      vn.summary = `Tóm tắt #${p.id}`;
      vn.description = `Mô tả #${p.id}`;
      dataList.push(vn);

      // English (2)
      const en = new PredictionData();
      en.prediction = p;
      en.language = { id: 2 } as any;
      en.title = `Prediction #${p.id}`;
      en.summary = `Summary #${p.id}`;
      en.description = `Description #${p.id}`;
      dataList.push(en);
    }

    await predictionDataRepo.save(dataList);
    console.log('Inserted prediction_data:', dataList.length);

    // ----------------------------------------------------
    // Insert pivot rows in area_prediction (many-to-many)
    // ----------------------------------------------------
    const areaPivot: AreaPrediction[] = [];

    for (const p of savedPredictions) {
      const areaCount = this.rand(1, 3);
      const used = new Set<number>();

      for (let i = 0; i < areaCount; i++) {
        let areaId = this.rand(1, 10);

        while (used.has(areaId)) {
          areaId = this.rand(1, 10);
        }
        used.add(areaId);

        const pivot = new AreaPrediction();
        pivot.predictionId = p.id;
        pivot.areaId = areaId;
        pivot.createdAt = new Date();
        pivot.updated_at = new Date();

        // We do NOT set pivot.prediction or pivot.area because pivot table only needs raw IDs
        areaPivot.push(pivot);
      }
    }

    await areaPredictionRepo.save(areaPivot);
    console.log('Inserted area_prediction:', areaPivot.length);
  }

  private rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
