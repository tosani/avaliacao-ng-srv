package br.com.pamcary.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description = "Ojeto para transporte do resultado da operação solicitada")
public class StatusResult<T extends Object> {

	@ApiModelProperty("Indicador de sucesso ou erro para operação solicitada")
	protected boolean success;

	@ApiModelProperty("Data e hora da execução da operação no formato dd/MM/yyyy HH:mm:ss")
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss", locale = "pt-BR", timezone = "GMT-3")
	protected Date date = new Date();

	@ApiModelProperty("Data e hora da execução da operação no formato epoch")
	@JsonFormat(shape = JsonFormat.Shape.NUMBER)
	protected Date timestamp = date;

	protected String message = "Operação realizada com sucesso";
	protected T payload;

	public StatusResult() {
	}

	public StatusResult(T payload) {
		this.payload = payload;
	}

	public StatusResult(boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public T getPayload() {
		return payload;
	}

	public void setPayload(T payload) {
		this.payload = payload;
	}

}
