package br.com.pamcary.configuration;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
	@Bean
	public Docket getSwaggerConfiguration() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.paths(PathSelectors.ant("/api/**"))
				.apis(RequestHandlerSelectors.basePackage("br.com"))
				.build()
				.apiInfo(getApiInfo());
	}
	
	@SuppressWarnings("rawtypes")
	private ApiInfo getApiInfo() {
		return new ApiInfo(
				"Avaliação API", 
				new StringBuilder("<h4>Tarefas:</h4>")
				.append("Crie uma API pública em que seja possível listar, cadastrar, deletar e atualizar pessoas (C.R.U.D)<br/>")
				.append("Crie um endpoint público de busca por CPF<br/>")
				.append("Crie uma interface web. Sugestão: Angular2+, JSF 1.2")
				.toString(), 
				"1.0", 
				"Publico", 
				new Contact("Paulo Tosani", null, "tosani@gmail.com"), 
				"", 
				"", 
				new ArrayList<VendorExtension>(0));		
	}
}
