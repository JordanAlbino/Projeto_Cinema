package com.teste.cinema;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication 
public class CinemaApplication { 
    public static void main(String[] args) { 
        SpringApplication.run(CinemaApplication.class, args);
    } 

    // @Bean 
    // public CommandLineRunner testDatabase(ClienteRepository clienteRepository) { 
    //     return args -> { 
    //         System.out.println("Testando conexão com o banco..."); 
    //         // Criando um cliente de teste 
    //         Cliente cliente = new Cliente();
    //         cliente.setNome("Teste Usuário"); 
    //         cliente.setCpf("123.456.789-00"); 
    //         cliente.setEmail("teste@email.com"); 
    //         cliente.setTelefone("11999999999"); 
    //         cliente.setSenha("123456"); 
        
    //         // Salvando no banco 
    //         Cliente savedCliente = clienteRepository.save(cliente); 
    //         System.out.println("Cliente salvo com ID: " + savedCliente.getId()); 
        
    //         // Buscando o cliente pelo ID 
    //         Optional<Cliente> foundCliente = clienteRepository.findById(savedCliente.getId()); 
    //         foundCliente.ifPresentOrElse( 
    //             c -> System.out.println("Cliente encontrado: " + c.getNome()), 
    //             () -> System.out.println("Cliente não encontrado!") 
    //         ); 
    //     }; 
    // }
}
