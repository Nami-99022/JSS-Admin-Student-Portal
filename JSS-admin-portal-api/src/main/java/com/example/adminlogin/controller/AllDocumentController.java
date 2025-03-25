package com.example.adminlogin.controller;

import com.example.adminlogin.model.AllDocument;
import com.example.adminlogin.model.Subject;
import com.example.adminlogin.model.User;
import com.example.adminlogin.repository.AllDocumentRepo;

import com.example.adminlogin.repository.UserRepo;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.UrlResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;



import org.springframework.core.io.Resource;

//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RestController
@RequestMapping("/api/alldocuments")
public class AllDocumentController {
    @Autowired
    private AllDocumentRepo allDocumentRepo;

    @Autowired
    private UserRepo userRepo;

    // Common base path where the folders will be created
    private static final String BASE_DIR = Paths.get(System.getProperty("user.home"), "myAppData", "alldocuments").toString();

    // Create the common folder structure on application startup
    @PostConstruct
    public void init() {
        // Define subfolders for each semester
        String[] semesters = {"sem1", "sem2", "sem3", "sem4", "sem5", "sem6"};

        // Create the base directory if it doesn't exist
        File baseDir = new File(BASE_DIR);
        if (!baseDir.exists()) {
            boolean created = baseDir.mkdirs();
            if (created) {
                System.out.println("Created base directory: " + BASE_DIR);
            } else {
                System.out.println("Failed to create base directory: " + BASE_DIR);
            }
        }

        // Create subdirectories for each semester
        for (String semester : semesters) {
            Path semesterPath = Paths.get(BASE_DIR, semester);
            File semesterFolder = new File(semesterPath.toString());
            if (!semesterFolder.exists()) {
                boolean created = semesterFolder.mkdirs(); // Create the folder if it doesn't exist
                if (created) {
                    System.out.println("Created folder for " + semester + ": " + semesterPath);
                } else {
                    System.out.println("Failed to create folder for " + semester + ": " + semesterPath);
                }
            }
        }
    }

    // Method to get the upload directory based on semester
    private String getUploadDirectory(String semester) {
        return Paths.get(BASE_DIR, semester).toString(); // Return the specific semester folder path
    }

    // Upload file method - admin uploads files
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
                                                          @RequestParam("documentType") String documentType,
                                                          @RequestParam("fileName") String fileName,
                                                          @RequestParam("fileType") String fileType,
                                                          @RequestParam("uploadDate") String uploadDate,
                                                          @RequestParam("userEmail") String userEmail,
                                                          @RequestParam("semester") String semester,
                                                          @RequestParam("documentCategory") String documentCategory,
                                                          @RequestParam("month") String month,
                                                          @RequestParam("subject") String subject) {
        Map<String, String> response = new HashMap<>();
        if (file.isEmpty()) {
            response.put("message", "File upload failed: File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            // Get the upload directory for the specific semester
            String uploadDir = getUploadDirectory(semester);
            String sanitizedFilename = fileName.replaceAll("[<>:\"/\\|?*]", "_");
            String semesterSpecificFilename = sanitizedFilename;

            // Create the semester folder if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Define the path to store the file
            Path filePath = uploadPath.resolve(semesterSpecificFilename);
            Files.copy(file.getInputStream(), filePath);

            // Prepare document object to save
            AllDocument document = new AllDocument();
            document.setDocumentType(documentType);
            document.setFileName(semesterSpecificFilename);
            document.setUploadDate(uploadDate);
            document.setFileType(fileType);
            document.setSemester(semester);
            document.setDocumentCategory(documentCategory);
            document.setDocumentPath(filePath.toString());
            document.setMonth(month);
            document.setSubject(subject);

            Optional<User> userOptional = userRepo.findByEmail(userEmail);
            if (userOptional.isPresent()) {
                document.setUser(userOptional.get());
            } else {
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            allDocumentRepo.save(document);

            response.put("documentId", document.getDocId().toString());
            response.put("uploadDate", document.getUploadDate());
            response.put("documentType", document.getDocumentType());
            response.put("documentCategory", document.getDocumentCategory());
            response.put("documentPath", document.getDocumentPath());

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("message", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }






//    private String getUploadDirectory(String semester) {
//        Map<String, String> semesterDirectories = new HashMap<>();
//        semesterDirectories.put("Sem1", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem1/");
//        semesterDirectories.put("Sem2", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem2/");
//        semesterDirectories.put("Sem3", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem3/");
//        semesterDirectories.put("Sem4", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem4/");
//        semesterDirectories.put("Sem5", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem5/");
//        semesterDirectories.put("Sem6", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem6/");
//
//        return semesterDirectories.getOrDefault(semester, "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem1/");
//    }
//



//    @PostMapping("/upload")
//    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
//                                                          @RequestParam("documentType") String documentType,
//                                                          @RequestParam("fileName") String fileName,
//                                                          @RequestParam("fileType") String fileType,
//                                                          @RequestParam("uploadDate") String uploadDate,
//                                                          @RequestParam("userEmail") String userEmail,
//                                                          @RequestParam("semester") String semester,
//                                                          @RequestParam("documentCategory") String documentCategory) {
//        Map<String, String> response = new HashMap<>();
//        if (file.isEmpty()) {
//            response.put("message", "File upload failed: File is empty");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//
//        try {
//            String uploadDir = getUploadDirectory(semester);
//            String sanitizedFilename = fileName.replaceAll("[<>:\"/\\|?*]", "_");
//            String semesterSpecificFilename = semester + "_" + sanitizedFilename;
//            Path filePath = Paths.get(uploadDir + semesterSpecificFilename);
//
//            if (Files.exists(filePath)) {
//                response.put("message", "File with the same name already exists in this semester");
//                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
//            }
//
//            Files.createDirectories(filePath.getParent());
//            Files.copy(file.getInputStream(), filePath);
//
//            String documentPath = filePath.toString();
//
//            AllDocument document = new AllDocument();
//            document.setDocumentType(documentType);
//            document.setFileName(semesterSpecificFilename);
//            document.setUploadDate(uploadDate);
//            document.setFileType(fileType);
//            document.setSemester(semester);
//            document.setDocumentCategory(documentCategory);
//            document.setDocumentPath(documentPath); // Set the document path
//
//            Optional<User> userOptional = userRepo.findByEmail(userEmail);
//            if (userOptional.isPresent()) {
//                document.setUser(userOptional.get());
//            } else {
//                response.put("message", "User not found");
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//            }
//
//            allDocumentRepo.save(document);
//
//            response.put("documentId", document.getDocId().toString());
//            response.put("uploadDate", document.getUploadDate());
//            response.put("documentType", document.getDocumentType());
//            response.put("documentCategory", document.getDocumentCategory());
//            response.put("documentPath", document.getDocumentPath()); // Include documentPath in response
//
//            return ResponseEntity.ok(response);
//        } catch (IOException e) {
//            e.printStackTrace();
//            response.put("message", "File upload failed: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }
//

//    @GetMapping("/category/{documentCategory}/{semester}")
//    public ResponseEntity<List<AllDocument>> getDocumentsByCategoryAndSemester(
//            @PathVariable("documentCategory") String documentCategory,
//            @PathVariable("semester") String semester) {
//        List<AllDocument> documents = allDocumentRepo.findBySemesterAndDocumentCategory(semester, documentCategory);
//        return ResponseEntity.ok(documents);
//    }

//    @GetMapping("/category/{documentCategory}/{semester}")
//    public ResponseEntity<List<AllDocument>> getDocumentsByCategoryAndSemester(
//            @PathVariable("documentCategory") String documentCategory,
//            @PathVariable("semester") String semester) {
//
//        // Log the received parameters
//        System.out.println("Fetching documents for Category: " + documentCategory + " and Semester: " + semester);
//
//        // Query the database
//        List<AllDocument> documents = allDocumentRepo.findBySemesterAndDocumentCategory(semester, documentCategory);
//
//        // Log the fetched documents
//        if (documents.isEmpty()) {
//            System.out.println("No documents found for Category: " + documentCategory + " and Semester: " + semester);
//        } else {
//            System.out.println("Found " + documents.size() + " documents.");
//        }
//
//        return ResponseEntity.ok(documents);
//    }

    @GetMapping("/category/{documentCategory}/{semester}")
    public ResponseEntity<List<AllDocument>> getDocumentsByQuery(
            @PathVariable("documentCategory") String documentCategory,
            @PathVariable("semester") String semester,
@RequestParam(required = false, defaultValue = "") String month,
@RequestParam(required = false, defaultValue = "") String subject) {

        // Log the received parameters
        System.out.println("Fetching documents for Category: " + documentCategory + " and Semester: " + semester);
        
        List<AllDocument> documents = new ArrayList<>();
        
        if (!month.isEmpty() && !subject.isEmpty())
        	documents = allDocumentRepo.findBySemesterIsAndDocumentCategoryIsAndMonthIsAndSubject(semester, documentCategory, month, subject);
        else if (!month.isEmpty())
        	documents = allDocumentRepo.findBySemesterIsAndDocumentCategoryIsAndMonth(semester, documentCategory, month);
        else if (!subject.isEmpty())
        	documents = allDocumentRepo.findBySemesterIsAndDocumentCategoryIsAndSubject(semester, documentCategory, subject);
        else
         documents = allDocumentRepo.findBySemesterAndDocumentCategory(semester, documentCategory);
        
        

        // Log the fetched documents
        if (documents.isEmpty()) {
            System.out.println("No documents found for Category: " + documentCategory + " and Semester: " + semester);
        } else {
            System.out.println("Found " + documents.size() + " documents.");
        }

        return ResponseEntity.ok(documents);
    }


    @GetMapping("/user/{id}")
    public ResponseEntity<List<AllDocument>> getDocumentsByUserId(@PathVariable Long id) {
        List<AllDocument> documents = allDocumentRepo.findByUserId(id);
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/{documentId}")
    public ResponseEntity<AllDocument> getDocumentById(@PathVariable Long documentId) {
        Optional<AllDocument> documentOptional = allDocumentRepo.findById(documentId);
        return documentOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/list")
    public ResponseEntity<List<String>> listUploadedFiles(@RequestParam String semester) {
        try {
            String uploadDir = getUploadDirectory(semester);
            File folder = new File(uploadDir);
            if (!folder.exists() || !folder.isDirectory()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Collections.singletonList("Error: Directory not found"));
            }

            File[] files = folder.listFiles();
            if (files != null && files.length > 0) {
                List<String> fileNames = Arrays.stream(files)
                        .filter(File::isFile)
                        .map(File::getName)
                        .collect(Collectors.toList());
                return ResponseEntity.ok(fileNames);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList("Error: Unable to fetch file list"));
        }
    }


    @GetMapping("/viewFile/{semester}/{filename:.+}")
    public ResponseEntity<?> viewFile(@PathVariable String semester, @PathVariable String filename) {
        try {
            String uploadDir = getUploadDirectory(semester);
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();

            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            String mimeType = Files.probeContentType(filePath);
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }

            // If the file is a text, image, PDF, or office document, try to open it in the browser
            if (mimeType.startsWith("text/") || mimeType.startsWith("image/") || mimeType.equals("application/pdf")) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, mimeType)
                        .body(resource);
            }

            // Add handling for Word, Excel, PowerPoint files
            if (mimeType.equals("application/msword") || mimeType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, mimeType)
                        .body(resource);
            }

            if (mimeType.equals("application/vnd.ms-excel") || mimeType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, mimeType)
                        .body(resource);
            }

            if (mimeType.equals("application/vnd.ms-powerpoint") || mimeType.equals("application/vnd.openxmlformats-officedocument.presentationml.presentation")) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, mimeType)
                        .body(resource);
            }

            // If not a supported type, prompt for download
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/download/{semester}/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String semester, @PathVariable String filename) {
        try {
            String uploadDir = getUploadDirectory(semester);
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();

            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            String mimeType = Files.probeContentType(filePath);
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, mimeType)
                    .body(resource);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }
    
    @Transactional
    @DeleteMapping("/download/{semester}/{filename:.+}")
    public ResponseEntity<Resource> deleteFile(@PathVariable String semester, @PathVariable String filename) {
        try {
            String uploadDir = getUploadDirectory(semester);
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();

            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            String mimeType = Files.probeContentType(filePath);
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }
            
            Files.deleteIfExists(filePath);
            allDocumentRepo.deleteBySemesterAndFileName(semester, filename);

            return ResponseEntity.ok()
                   .build();

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }
    
    @GetMapping("/semester/{semester}")
    public ResponseEntity<List<String>> getAllSemesters(@PathVariable String semester,
    													@RequestParam(required = false, defaultValue = "") String category) {
    	List<String> semesters = new ArrayList<>();
    	if (!category.isEmpty()) {
    		 semesters = allDocumentRepo.findBySemesterAndDocumentCategory(semester, category).stream()
            .map(AllDocument::getSubject)
            .distinct()
            .sorted()
            .collect(Collectors.toList());}
    	else {
       semesters = allDocumentRepo.findBySemester(semester).stream()
                .map(AllDocument::getSubject)
                .distinct()
                .sorted()
                .collect(Collectors.toList());}
        return ResponseEntity.ok(semesters);
    }

//    @GetMapping("/category/{documentCategory}/{semester}")
//    public ResponseEntity<List<AllDocument>> getDocumentsByCategoryAndSemester1(
//            @PathVariable("documentCategory") String documentCategory,
//            @PathVariable("semester") String semester) {
//        List<AllDocument> documents = allDocumentRepo.findBySemesterAndDocumentCategory(semester, documentCategory);
//        return ResponseEntity.ok(documents);
//    }

//    @GetMapping("/category/{category}/{semester}")
//    public ResponseEntity<Resource> downloadTimetable(
//            @PathVariable String category,
//            @PathVariable String semester) throws IOException {
//        // Generate or retrieve the timetable file (Example: CSV file)
//        String filename = semester + "_timetable.csv";
//        Path filePath = Paths.get("path/to/generated/files/" + filename);
//        Resource resource = new FileSystemResource(filePath);
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
//                .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                .body(resource);
//    }

}






