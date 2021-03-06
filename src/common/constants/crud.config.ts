import { CrudOptions } from '@nestjsx/crud';

export const crudGeneralOptions: Partial<CrudOptions> = {
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true
    }
  },
  query: {
    maxLimit: 100,
    cache: 2000,
    alwaysPaginate: true,
    exclude: [
      'password',
      'verificationCode',
      'accessToken',
      'desktopAccessToken',
      'twoFactorAuthSecret'
    ]
  }
};
