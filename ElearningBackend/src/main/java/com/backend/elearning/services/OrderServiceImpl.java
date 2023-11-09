package com.backend.elearning.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.elearning.models.Order;
import com.backend.elearning.repositories.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Override
	public String saveOrder(Order order) {
		orderRepository.save(order);
		return "Order Saved";
	}

}
