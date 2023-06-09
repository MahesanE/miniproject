package sg.edu.nus.iss.miniproject.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig {
    private String DATABASE_NAME = "Vape"; 

    @Value("${spring.datasource.mongo.url}")
    private String mongoUrl; 

    @Bean
    public MongoTemplate createMongoTemplate() {
        MongoClient client = MongoClients.create(mongoUrl); 
        return new MongoTemplate(client, DATABASE_NAME); 
    }  


    
}
