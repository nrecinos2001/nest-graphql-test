import { ForbiddenException } from '@nestjs/common';

export function validateSameUser(authorLoggedId: number, id: number): void {
  if (id !== authorLoggedId) {
    throw new ForbiddenException();
  }
}
