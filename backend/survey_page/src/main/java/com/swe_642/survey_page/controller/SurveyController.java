package com.swe_642.survey_page.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.swe_642.survey_page.model.SurveyDetails;
import com.swe_642.survey_page.service.SurveyService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173"})
 // Angular default port and React
@RequestMapping("/api/surveys")

public class SurveyController {

	private final SurveyService service;

	public SurveyController(SurveyService service) {
		this.service = service;
	}

	@PostMapping
	public SurveyDetails createSurvey(@RequestBody SurveyDetails survey) {
		return service.createSurvey(survey);
	}

	@GetMapping
	public List<SurveyDetails> getAllSurveys() {
		return service.getAllSurveys();
	}

	@GetMapping("/{id}")
	public SurveyDetails getSurvey(@PathVariable Long id) {
		return service.getSurveyById(id);
	}
	@PutMapping("/{id}")
    public SurveyDetails updateSurvey(@PathVariable Long id, @RequestBody SurveyDetails survey) {
        return service.updateSurvey(id, survey);
    }
	

	@DeleteMapping("/{id}")
	public void deleteSurvey(@PathVariable Long id) {
		service.deleteSurvey(id);
	}
}
