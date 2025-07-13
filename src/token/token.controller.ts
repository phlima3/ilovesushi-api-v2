import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenService } from './token.service';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @ApiOperation({ summary: 'Obter token atual' })
  @ApiResponse({
    status: 200,
    description: 'Token atual',
    type: Token,
  })
  getCurrent() {
    return this.tokenService.getCurrent();
  }

  @Put()
  @ApiOperation({ summary: 'Definir token' })
  @ApiResponse({
    status: 200,
    description: 'Token atualizado com sucesso',
    type: Token,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  updateCurrent(@Body() updateTokenDto: UpdateTokenDto) {
    return this.tokenService.updateCurrent(updateTokenDto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover token' })
  @ApiResponse({ status: 204, description: 'Token removido com sucesso' })
  deleteCurrent() {
    return this.tokenService.deleteCurrent();
  }
}
