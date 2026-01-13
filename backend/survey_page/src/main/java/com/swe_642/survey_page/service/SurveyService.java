package com.swe_642.survey_page.service;
import com.swe_642.survey_page.model.SurveyDetails;
import com.swe_642.survey_page.model.*;
import java.util.List;

public interface SurveyService {

	SurveyDetails createSurvey(SurveyDetails survey);
	List<SurveyDetails> getAllSurveys();
	SurveyDetails getSurveyById(Long id);
	SurveyDetails updateSurvey(Long id, SurveyDetails survey);
	void deleteSurvey(Long id);

}
