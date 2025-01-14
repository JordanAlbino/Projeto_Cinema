package com.teste.cinema.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teste.cinema.model.Cliente;
import com.teste.cinema.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente salvarCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public List<Cliente> getAllClientes(){
        return clienteRepository.findAll();
    }

    public Optional<Cliente> getClienteById(Long id){
        return clienteRepository.findById(id);
    }

    public Optional<Cliente> atualizarCliente(Long id, Cliente atualizarCliente){
        return clienteRepository.findById(id).map(existingCliente -> {
            existingCliente.setNome(atualizarCliente.getNome());
            existingCliente.setCpf(atualizarCliente.getCpf());
            existingCliente.setEmail(atualizarCliente.getEmail());
            existingCliente.setTelefone(atualizarCliente.getTelefone());
            existingCliente.setSenha(atualizarCliente.getSenha());
            return clienteRepository.save(existingCliente);
        });
    }

    public void deletarCliente(Long id){
        clienteRepository.deleteById(id);
    }

}
