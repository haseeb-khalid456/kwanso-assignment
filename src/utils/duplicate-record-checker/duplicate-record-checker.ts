import { ConflictException, HttpStatus, InternalServerErrorException } from "@nestjs/common";

export const trackDuplicationErrors = (e: any) => {
  //Get error details..
  const errorDetail: string = e.detail;
  let errorField: string = errorDetail
    .substring(e.detail.indexOf(
      '(') + 1, e.detail.indexOf(')')
    );
  errorField = errorField.charAt(0).toUpperCase() + errorField.slice(1);

//If username, email already exists then throw conflict exception..
  if (errorDetail.includes('already exists')) {
    throw new ConflictException(
      HttpStatus.CONFLICT,
      `${errorField} already exists`
    );
  } else {
    throw new InternalServerErrorException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Error while creating candidate."
    );
  }
}