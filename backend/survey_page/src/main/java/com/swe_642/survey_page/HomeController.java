package com.swe_642.survey_page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	
	@GetMapping("/")
    public String home() {
        return "redirect:/survey"; // change to your actual page mapping
    }

}
