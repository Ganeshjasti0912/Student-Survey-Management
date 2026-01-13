package com.swe_642.survey_page.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.swe_642.survey_page.model.SurveyDetails; 

public interface SurveyRepository extends JpaRepository<SurveyDetails, Long>{
	

	

}
