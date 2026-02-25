import { DataSource } from 'typeorm';
import { SystemConfig } from '../entities/index.entity';
import { SystemConfigCode } from 'src/common/constants/system-config.constant';

export class SystemConfigSeeder {
  constructor(private dataSource: DataSource) { }

  async run() {
    const systemConfigRepository = this.dataSource.getRepository(SystemConfig);

    const systemConfigMapData = {
      [SystemConfigCode.ZALO_NUMBER]: {
        code: SystemConfigCode.ZALO_NUMBER,
        name: 'Số điện thoại Zalo',
        value: '0123456789',
        valueType: 'string',
        description: 'Số điện thoại Zalo dùng để liên hệ',
        isSecure: false,
      },
      [SystemConfigCode.AI_API_KEY]: {
        code: SystemConfigCode.AI_API_KEY,
        name: 'Gemini API Key',
        value: 'API_KEY',
        valueType: 'string',
        description: 'API Key Gemini — AI provider chính',
        isSecure: true,
      },
      [SystemConfigCode.OPENAI_API_KEY]: {
        code: SystemConfigCode.OPENAI_API_KEY,
        name: 'OpenAI API Key',
        value: '',
        valueType: 'string',
        description: 'API Key OpenAI — backup khi Gemini gặp lỗi',
        isSecure: true,
      },
      [SystemConfigCode.AI_PROVIDER_DEFAULT]: {
        code: SystemConfigCode.AI_PROVIDER_DEFAULT,
        name: 'AI Provider mặc định',
        value: 'gemini',
        valueType: 'string',
        description: 'Provider mặc định: gemini hoặc openai',
        isSecure: false,
      },
      [SystemConfigCode.INVESTMENT_TOOL_BY_HOUR_FILE]: {
        code: SystemConfigCode.INVESTMENT_TOOL_BY_HOUR_FILE,
        name: 'File ranging theo giờ',
        value: 'ranging_theo_gio.csv',
        valueType: 'file',
        description: 'File dùng cho tool đầu tư',
        isSecure: false,
      },
      [SystemConfigCode.INVESTMENT_TOOL_BY_DAY_FILE]: {
        code: SystemConfigCode.INVESTMENT_TOOL_BY_DAY_FILE,
        name: 'File ranging theo ngày',
        value: 'ranging_theo_ngay.csv',
        valueType: 'file',
        description: 'File dùng cho tool đầu tư',
        isSecure: false,
      },
      [SystemConfigCode.INVESTMENT_TOOL_BY_YEAR_FILE]: {
        code: SystemConfigCode.INVESTMENT_TOOL_BY_YEAR_FILE,
        name: 'File ranging theo năm',
        value: 'ranging_theo_nam.csv',
        valueType: 'file',
        description: 'File dùng cho tool đầu tư',
        isSecure: false,
      },
      [SystemConfigCode.INVESTMENT_TOOL_EVENTS_FILE]: {
        code: SystemConfigCode.INVESTMENT_TOOL_EVENTS_FILE,
        name: 'File Events (Dự đoán Thiên Cơ Sách)',
        value: 'events_thien_co_sach.csv',
        valueType: 'file',
        description: 'File sự kiện dự đoán dùng cho tool đầu tư',
        isSecure: false,
      },
    };

    for (const code of Object.values(SystemConfigCode)) {
      const systemConfig = await systemConfigRepository.findOneBy({ code });
      if (!systemConfig) {
        const newSystemConfig = systemConfigRepository.create(
          systemConfigMapData[code],
        );
        await systemConfigRepository.save(newSystemConfig);
      }
    }
  }
}
