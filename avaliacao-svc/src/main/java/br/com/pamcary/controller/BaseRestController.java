package br.com.pamcary.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import br.com.pamcary.dto.StatusResult;

@Controller
public abstract class BaseRestController {
	private static final Log LOG = LogFactory.getLog(BaseRestController.class);

	public <T extends Object> ResponseEntity<StatusResult<T>> prepareRestResponseSuccess(T resultado) {
		StatusResult<T> result = new StatusResult<T>();
		result.setSuccess(true);
		result.setPayload(resultado);
		return prepareRestResponseSuccess(result);
	}

	public <T extends Object> ResponseEntity<StatusResult<T>> prepareRestResponseSuccess(StatusResult<T> result) {
		return ResponseEntity.ok().body(result);
	}

	public <T extends Object> ResponseEntity<StatusResult<T>> prepareRestResponseError(Throwable throwable) {
		StatusResult<T> result = new StatusResult<T>();
		result.setSuccess(false);
		result.setMessage(throwable.getMessage());
		LOG.error(throwable);
		return prepareRestResponseError(result);
	}

	public <T extends Object> ResponseEntity<StatusResult<T>> prepareRestResponseError(StatusResult<T> result) {
		return ResponseEntity.badRequest().body(result);
	}

	public <T extends Object> ResponseEntity<StatusResult<T>> prepareRestResponse(StatusResult<T> result) {
		if (result.isSuccess()) {
			return prepareRestResponseSuccess(result);
		} else {
			return prepareRestResponseError(result);
		}
	}

}
