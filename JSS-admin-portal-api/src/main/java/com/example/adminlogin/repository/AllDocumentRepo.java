package com.example.adminlogin.repository;

import com.example.adminlogin.model.AllDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AllDocumentRepo extends JpaRepository<AllDocument,Long> {
    List<AllDocument> findByUserId(Long userId);
    List<AllDocument> findByDocumentCategory(String documentCategory);
//    List<AllDocument> findBySemesterAndDocumentCategory(String semester, String documentCategory);
//    List<AllDocument> findBySemesterAndDocumentCategory(String semester, String documentCategory);
public List<AllDocument> findBySemesterAndDocumentCategory(String semester, String documentCategory);
public List<AllDocument> findBySemesterIsAndDocumentCategoryIsAndMonthIsAndSubject(String semester, String documentCategory, String month, String subject);
public List<AllDocument> findBySemesterIsAndDocumentCategoryIsAndMonth(String semester, String documentCategory, String month);
public List<AllDocument> findBySemesterIsAndDocumentCategoryIsAndSubject(String semester, String documentCategory, String subject);
public List<AllDocument> findBySemester(String semester);
public void deleteBySemesterAndFileName(String semester, String fileName);

}
