package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "alldocuments")
public class AllDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long docId;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    private String uploadDate;

    @Column(name = "semester")
    private String semester;

    @Column(name = "document_category")
    private String documentCategory;

    @Column(name = "document_path")
    private String documentPath;
    
    @Column(name = "month")
    private String month;
    
    @Column(name = "subject")
    private String subject;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;
}