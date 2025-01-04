package com.utcn.scdproiect.mail;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {
    @Bean
    public JavaMailSender javaMailSender() {
        Dotenv dotenv = Dotenv.load();

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        System.out.println(dotenv.get("SPRING_MAIL_HOST"));
        mailSender.setHost(dotenv.get("SPRING_MAIL_HOST"));
        mailSender.setPort(587);
        mailSender.setUsername(dotenv.get("MAILJET_API_KEY"));
        mailSender.setPassword(dotenv.get("MAILJET_SECRET_KEY"));

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
