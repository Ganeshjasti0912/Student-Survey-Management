package com.swe_642.survey_page.model;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
@Entity
@Table(name = "survey_details")
public class SurveyDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String state;

    @Column(name = "zip_code")
    private String zip;
    //private String graduationMonth;
    //private String graduationYear;
    //private String personalUrl;
    private String phone;
    private String email;
    private LocalDate dateOfSurvey;
    @ElementCollection
    private List<String> likedMost;

    private String sourceOfInterest;
    private String recommend;
    private String comments;
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }
//    public String getGraduationMonth() { return graduationMonth; }
//
//    public void setGraduationMonth(String graduationMonth) { this.graduationMonth = graduationMonth; }
//
//    public String getGraduationYear() { return graduationYear; }
//
//    public void setGraduationYear(String graduationYear) { this.graduationYear = graduationYear; }
//
//    public String getPersonalUrl() { return personalUrl; }
//
//    public void setPersonalUrl(String personalUrl) { this.personalUrl = personalUrl; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public LocalDate getDateOfSurvey() { return dateOfSurvey; }
    public void setDateOfSurvey(LocalDate dateOfSurvey) { this.dateOfSurvey = dateOfSurvey; }
    public List<String> getLikedMost() { return likedMost; }
    public void setLikedMost(List<String> likedMost) { this.likedMost = likedMost; }
    public String getSourceOfInterest() { return sourceOfInterest; }
    public void setSourceOfInterest(String sourceOfInterest) { this.sourceOfInterest = sourceOfInterest; }
    public String getRecommend() { return recommend; }
    public void setRecommend(String recommend) { this.recommend = recommend; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
}