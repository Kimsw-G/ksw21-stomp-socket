package com.example.ksw.controller;

import com.example.ksw.model.Greeting;
import com.example.ksw.model.HelloMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


    @MessageMapping("/hello/{room}")
    @SendTo("/topic/{room}")
    public Greeting greeting(@DestinationVariable String room,
                             HelloMessage message) throws Exception{
        return new Greeting("Hello,"+ HtmlUtils.htmlEscape(message.getName())+"!");
    }

}
