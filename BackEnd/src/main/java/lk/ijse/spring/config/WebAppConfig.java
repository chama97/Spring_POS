package lk.ijse.spring.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/

@Configuration
@ComponentScan(basePackages = "lk.ijse")
@EnableWebMvc
public class WebAppConfig {

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
