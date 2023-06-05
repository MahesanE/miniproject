package sg.edu.nus.iss.miniproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

// import sg.edu.nus.iss.miniproject.CSVtoMYSQL.CSVtoMySQLService;

@SpringBootApplication
public class MiniProjectApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(MiniProjectApplication.class, args);

		// CSVtoMySQLService csVtoMySQLService = context.getBean(CSVtoMySQLService.class);

		// try {
		// 	csVtoMySQLService.loadDataFromCSVToMySQL();
		// } catch (Exception e) {
		// 	e.printStackTrace();
		// }
	}

}

