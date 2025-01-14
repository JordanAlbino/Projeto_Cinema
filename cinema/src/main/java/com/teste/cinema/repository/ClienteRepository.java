package com.teste.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teste.cinema.model.Cliente;

public interface ClienteRepository extends JpaRepository <Cliente, Long> {
}
