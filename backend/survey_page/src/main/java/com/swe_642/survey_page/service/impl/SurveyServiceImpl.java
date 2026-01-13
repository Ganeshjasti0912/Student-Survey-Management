package com.swe_642.survey_page.service.impl;
import com.swe_642.survey_page.exception.ResourceNotFoundException;

import java.util.List;

import org.springframework.stereotype.Service;

import com.swe_642.survey_page.exception.ResourceNotFoundException;
import com.swe_642.survey_page.model.SurveyDetails;
import com.swe_642.survey_page.repository.SurveyRepository;
import com.swe_642.survey_page.service.SurveyService;
import org.springframework.data.domain.Sort;

@Service // registers this class as a Spring Bean
public class SurveyServiceImpl implements SurveyService {

    private final SurveyRepository repo;

    public SurveyServiceImpl(SurveyRepository repo) {
        this.repo = repo; // dependency injection
    }

    @Override
    public SurveyDetails createSurvey(SurveyDetails survey) {
        return repo.save(survey); // INSERT into DB
    }

    @Override
    public List<SurveyDetails> getAllSurveys() {
        return repo.findAll(); // SELECT * from DB
    }

    @Override
    public SurveyDetails getSurveyById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Survey not found with id: " + id));
    }
    
    @Override
    public SurveyDetails updateSurvey(Long id, SurveyDetails newSurveyDetails) {
        SurveyDetails existingSurvey = getSurveyById(id);

        existingSurvey.setFirstName(newSurveyDetails.getFirstName());
        existingSurvey.setLastName(newSurveyDetails.getLastName());
        existingSurvey.setAddress(newSurveyDetails.getAddress());
        existingSurvey.setCity(newSurveyDetails.getCity());
        existingSurvey.setState(newSurveyDetails.getState());
        existingSurvey.setZip(newSurveyDetails.getZip());
        existingSurvey.setPhone(newSurveyDetails.getPhone());
        existingSurvey.setEmail(newSurveyDetails.getEmail());
        existingSurvey.setDateOfSurvey(newSurveyDetails.getDateOfSurvey());
        existingSurvey.setLikedMost(newSurveyDetails.getLikedMost());
        existingSurvey.setSourceOfInterest(newSurveyDetails.getSourceOfInterest());
        existingSurvey.setRecommend(newSurveyDetails.getRecommend());
        existingSurvey.setComments(newSurveyDetails.getComments());
//        existingSurvey.setGraduationMonth(newSurveyDetails.getGraduationMonth());
//        existingSurvey.setGraduationYear(newSurveyDetails.getGraduationYear());
//        existingSurvey.setPersonalUrl(newSurveyDetails.getPersonalUrl());

        return repo.save(existingSurvey);
    }

    @Override
    public void deleteSurvey(Long id) {
        repo.deleteById(id);
    }
}
