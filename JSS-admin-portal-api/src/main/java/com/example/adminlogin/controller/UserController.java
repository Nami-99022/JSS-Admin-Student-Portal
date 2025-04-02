package com.example.adminlogin.controller;

import com.example.adminlogin.model.User;
import com.example.adminlogin.repository.UserRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")

public class UserController {


//    private static final String SSLC_MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/sslcMarksCard/";
//    private static final String BE_MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/beMarksCard/";
//    private static final String DEGREE_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/degreeCertificate/";
//    private static final String PHOTO_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/photo/";
//    private static final String STAFF_PROFILE_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/staffprofile/";
//    private static final String ADHAR_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/student/adharcard/";
//    private static final String CASTE_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/castecertificate/";
//    private static final String INCOME_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/incomecertificate/";
//    private static final String MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/student/marksCard/";
//    private static final String MIGRATION_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/migrationcertificate/";
//    private static final String STUDENT_PHOTO_DIR = "C:/Users/nithya prashanth/Desktop/images/student/photo/";
//    private static final String PHYSICAL_FITNESS_DIR = "C:/Users/nithya prashanth/Desktop/images/student/physicalfitness/";
//    private static final String STUDY_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/studycertificate/";
//    private static final String TRANSFER_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/tc/";

    // Define the base directory for uploads using user home directory
    private static final String BASE_DIR = System.getProperty("user.home") + "/images/upload";

//    private static final String BASE_DIR = "admin_uploads";

    private static final String SSLC_MARKS_CARD_DIR = BASE_DIR + "/sslcMarksCard";
    private static final String BE_MARKS_CARD_DIR = BASE_DIR + "/beMarksCard";
    private static final String DEGREE_CERTIFICATE_DIR = BASE_DIR + "/degreeCertificate";
    private static final String PHOTO_DIR = BASE_DIR + "/photo";
    private static final String STAFF_PROFILE_DIR = BASE_DIR + "/staffProfile";
    private static final String ADHAR_CARD_DIR = BASE_DIR + "/adharCard";
    private static final String STUDY_CERTIFICATE_DIR = BASE_DIR + "/studyCertificate";
    private static final String TRANSFER_CERTIFICATE_DIR = BASE_DIR + "/transferCertificate";
    private static final String PHYSICAL_FITNESS_DIR = BASE_DIR + "/physicalFitness";
    private static final String MIGRATION_CERTIFICATE_DIR = BASE_DIR + "/migrationCertificate";
    private static final String INCOME_CERTIFICATE_DIR = BASE_DIR + "/incomeCertificate";
    private static final String CASTE_CERTIFICATE_DIR = BASE_DIR + "/casteCertificate";
    private static final String MARKS_CARD_DIR = BASE_DIR + "/marksCard";
    private static final String STUDENT_PHOTO_DIR = BASE_DIR + "/studentPhoto";

    // Define subfolders for each semester
    private static final String[] SEMESTERS = {"sem1", "sem2", "sem3", "sem4", "sem5", "sem6"};

    @PostConstruct
    public void createDirectories() {
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
        for (String semester : SEMESTERS) {
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

    @Autowired
    private UserRepo userRepository;

    public UserController(UserRepo userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @GetMapping("/getAll")
    public ResponseEntity<?> getAllUser() {
        try {

            List<User> staffList = userRepository.findAll();
            return ResponseEntity.ok().body(staffList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving staff data: " + e.getMessage());
        }
    }


//    @PostMapping("/register")
//    public ResponseEntity<?> registerStudent(
//            @RequestParam("userName") String userName,
//            @RequestParam("email") String email,
//            @RequestParam("password") String password,
//            @RequestParam("phoneno") String phoneno,
//            @RequestParam("address") String address,
//            @RequestParam("adharno") String adharno,
//            @RequestParam("role") String role,
//            @RequestParam("dept") String dept,
//            @RequestParam("semester") String semester,
//            @RequestParam("momphoneno") String momphoneno,
//            @RequestParam("dadphoneno") String dadphoneno,
//            @RequestParam("regno") String regno,
//            @RequestParam("panCardNumber") String panCardNumber,
//            @RequestParam(value = "sslcMarksCard", required = false) MultipartFile sslcMarksCard,
//            @RequestParam(value = "beMarksCard", required = false) MultipartFile beMarksCard,
//            @RequestParam(value = "degreeCertificate", required = false) MultipartFile degreeCertificate,
//            @RequestParam(value = "photo", required = false) MultipartFile photo,
//            @RequestParam(value = "staffProfile", required = false) MultipartFile staffProfile,
//            @RequestParam(value = "adharCard", required = false) MultipartFile adharCard,
//            @RequestParam(value = "studyCertificate", required = false) MultipartFile studyCertificate,
//            @RequestParam(value = "transferCertificate", required = false) MultipartFile transferCertificate,
//            @RequestParam(value = "physicalFitness", required = false) MultipartFile physicalFitness,
//            @RequestParam(value = "migrationCertificate", required = false) MultipartFile migrationCertificate,
//            @RequestParam(value = "incomeCertificate", required = false) MultipartFile incomeCertificate,
//            @RequestParam(value = "casteCertificate", required = false) MultipartFile casteCertificate,
//            @RequestParam(value = "studsslcmarksCard", required = false) MultipartFile studsslcmarksCard,
//            @RequestParam(value = "studphoto", required = false) MultipartFile studphoto
//    ) {
//        try {
//            // Save files
//            String sslcMarksCardPath = saveFile(sslcMarksCard, SSLC_MARKS_CARD_DIR);
//            String beMarksCardPath = saveFile(beMarksCard, BE_MARKS_CARD_DIR);
//            String degreeCertificatePath = saveFile(degreeCertificate, DEGREE_CERTIFICATE_DIR);
//            String photoPath = saveFile(photo, PHOTO_DIR);
//            String staffProfilePath = saveFile(staffProfile, STAFF_PROFILE_DIR);
//            String adharCardPath = saveFile(adharCard, ADHAR_CARD_DIR);
//            String studyCertificatePath = saveFile(studyCertificate, STUDY_CERTIFICATE_DIR);
//            String transferCertificatePath = saveFile(transferCertificate, TRANSFER_CERTIFICATE_DIR);
//            String physicalFitnessPath = saveFile(physicalFitness, PHYSICAL_FITNESS_DIR);
//            String migrationCertificatePath = saveFile(migrationCertificate, MIGRATION_CERTIFICATE_DIR);
//            String incomeCertificatePath = saveFile(incomeCertificate, INCOME_CERTIFICATE_DIR);
//            String casteCertificatePath = saveFile(casteCertificate, CASTE_CERTIFICATE_DIR);
//            String studsslcmarksCardPath = saveFile(studsslcmarksCard, MARKS_CARD_DIR);
//            String studphotoPath = saveFile(studphoto, STUDENT_PHOTO_DIR);
//
//
//            User user = new User();
//            user.setUserName(userName);
//            user.setEmail(email);
//            user.setPassword(password);
//            user.setPhoneno(phoneno);
//            user.setAddress(address);
//            user.setAdharno(adharno);
//            user.setDept(dept);
//            user.setSemester(semester);
//            user.setMomphoneno(momphoneno);
//            user.setDadphoneno(dadphoneno);
//            user.setRegno(regno);
//            user.setRole(role);
//            user.setPanCardNumber(panCardNumber);
//            user.setSslcMarksCardPath(sslcMarksCardPath);
//            user.setBeMarksCardPath(beMarksCardPath);
//            user.setDegreeCertificatePath(degreeCertificatePath);
//            user.setPhotoPath(photoPath);
//            user.setStaffProfilePath(staffProfilePath);
//            user.setAdharCardPath(adharCardPath);
//            user.setCasteCertificatePath(casteCertificatePath);
//            user.setIncomeCertificatePath(incomeCertificatePath);
//            user.setMigrationCertificatePath(migrationCertificatePath);
//            user.setPhysicalFitnessPath(physicalFitnessPath);
//            user.setStudyCertificatePath(studyCertificatePath);
//            user.setStudphotoPath(studphotoPath);
//            user.setStudsslcmarksCardPath(studsslcmarksCardPath);
//            user.setTransferCertificatePath(transferCertificatePath);
//
//            // Save to database
//            userRepository.save(user);
//
//            return ResponseEntity.ok().body("Staff registration successful!");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error uploading files or saving staff: " + e.getMessage());
//        }
//    }
//
//    private String saveFile(MultipartFile file, String directory) throws IOException {
//        if (file != null && !file.isEmpty()) {
//            File dir = new File(directory);
//            if (!dir.exists()) {
//                dir.mkdirs();
//            }
////            String filePath = directory + File.separator + file.getOriginalFilename();
//            String filePath =file.getOriginalFilename();
//            file.transferTo(new File(filePath));
//            return filePath;
//        }
//        return null;
//    }

    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(
            @RequestParam("userName") String userName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("phoneno") String phoneno,
            @RequestParam("address") String address,
            @RequestParam("adharno") String adharno,
            @RequestParam("role") String role,
            @RequestParam("dept") String dept,
            @RequestParam("semester") String semester,
            @RequestParam("momphoneno") String momphoneno,
            @RequestParam("dadphoneno") String dadphoneno,
            @RequestParam("regno") String regno,
            @RequestParam("panCardNumber") String panCardNumber,
            @RequestParam(value = "sslcMarksCard", required = false) MultipartFile sslcMarksCard,
            @RequestParam(value = "beMarksCard", required = false) MultipartFile beMarksCard,
            @RequestParam(value = "degreeCertificate", required = false) MultipartFile degreeCertificate,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "staffProfile", required = false) MultipartFile staffProfile,
            @RequestParam(value = "adharCard", required = false) MultipartFile adharCard,
            @RequestParam(value = "studyCertificate", required = false) MultipartFile studyCertificate,
            @RequestParam(value = "transferCertificate", required = false) MultipartFile transferCertificate,
            @RequestParam(value = "physicalFitness", required = false) MultipartFile physicalFitness,
            @RequestParam(value = "migrationCertificate", required = false) MultipartFile migrationCertificate,
            @RequestParam(value = "incomeCertificate", required = false) MultipartFile incomeCertificate,
            @RequestParam(value = "casteCertificate", required = false) MultipartFile casteCertificate,
            @RequestParam(value = "studsslcmarksCard", required = false) MultipartFile studsslcmarksCard,
            @RequestParam(value = "studphoto", required = false) MultipartFile studphoto
    ) {
        try {
            // Ensure directories are created
            createDirectory(SSLC_MARKS_CARD_DIR);
            createDirectory(BE_MARKS_CARD_DIR);
            createDirectory(DEGREE_CERTIFICATE_DIR);
            createDirectory(PHOTO_DIR);
            createDirectory(STAFF_PROFILE_DIR);
            createDirectory(ADHAR_CARD_DIR);
            createDirectory(STUDY_CERTIFICATE_DIR);
            createDirectory(TRANSFER_CERTIFICATE_DIR);
            createDirectory(PHYSICAL_FITNESS_DIR);
            createDirectory(MIGRATION_CERTIFICATE_DIR);
            createDirectory(INCOME_CERTIFICATE_DIR);
            createDirectory(CASTE_CERTIFICATE_DIR);
            createDirectory(MARKS_CARD_DIR);
            createDirectory(STUDENT_PHOTO_DIR);

            // Save files and get their paths
            String sslcMarksCardPath = saveFile(sslcMarksCard, SSLC_MARKS_CARD_DIR);
            String beMarksCardPath = saveFile(beMarksCard, BE_MARKS_CARD_DIR);
            String degreeCertificatePath = saveFile(degreeCertificate, DEGREE_CERTIFICATE_DIR);
            String photoPath = saveFile(photo, PHOTO_DIR);
            String staffProfilePath = saveFile(staffProfile, STAFF_PROFILE_DIR);
            String adharCardPath = saveFile(adharCard, ADHAR_CARD_DIR);
            String studyCertificatePath = saveFile(studyCertificate, STUDY_CERTIFICATE_DIR);
            String transferCertificatePath = saveFile(transferCertificate, TRANSFER_CERTIFICATE_DIR);
            String physicalFitnessPath = saveFile(physicalFitness, PHYSICAL_FITNESS_DIR);
            String migrationCertificatePath = saveFile(migrationCertificate, MIGRATION_CERTIFICATE_DIR);
            String incomeCertificatePath = saveFile(incomeCertificate, INCOME_CERTIFICATE_DIR);
            String casteCertificatePath = saveFile(casteCertificate, CASTE_CERTIFICATE_DIR);
            String studsslcmarksCardPath = saveFile(studsslcmarksCard, MARKS_CARD_DIR);
            String studphotoPath = saveFile(studphoto, STUDENT_PHOTO_DIR);

            // Create the User object
            User user = new User();
            user.setUserName(userName);
            user.setEmail(email);
            user.setPassword(password);
            user.setPhoneno(phoneno);
            user.setAddress(address);
            user.setAdharno(adharno);
            user.setDept(dept);
            user.setSemester(semester);
            user.setMomphoneno(momphoneno);
            user.setDadphoneno(dadphoneno);
            user.setRegno(regno);
            user.setRole(role);
            user.setPanCardNumber(panCardNumber);
            user.setSslcMarksCardPath(sslcMarksCardPath);
            user.setBeMarksCardPath(beMarksCardPath);
            user.setDegreeCertificatePath(degreeCertificatePath);
            user.setPhotoPath(photoPath);
            user.setStaffProfilePath(staffProfilePath);
            user.setAdharCardPath(adharCardPath);
            user.setCasteCertificatePath(casteCertificatePath);
            user.setIncomeCertificatePath(incomeCertificatePath);
            user.setMigrationCertificatePath(migrationCertificatePath);
            user.setPhysicalFitnessPath(physicalFitnessPath);
            user.setStudyCertificatePath(studyCertificatePath);
            user.setStudphotoPath(studphotoPath);
            user.setStudsslcmarksCardPath(studsslcmarksCardPath);
            user.setTransferCertificatePath(transferCertificatePath);

            // Save to database
            userRepository.save(user);

            return ResponseEntity.ok().body("Staff registration successful!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading files or saving staff: " + e.getMessage());
        }
    }

    // Method to save the file
    private String saveFile(MultipartFile file, String directory) throws IOException {
        if (file != null && !file.isEmpty()) {
            File dir = new File(directory);
            if (!dir.exists()) {
                dir.mkdirs(); // Create the directory if it doesn't exist
            }
            // Construct the file path (you can adjust how the file name is created)
            String filePath = directory + File.separator + file.getOriginalFilename();
            file.transferTo(new File(filePath)); // Save the file
            return filePath; // Return the file path
        }
        return null;
    }

    // Method to create a directory if it doesn't exist
    private void createDirectory(String directory) {
        File dir = new File(directory);
        if (!dir.exists()) {
            dir.mkdirs(); // Create the directory if it doesn't exist
        }
    }


    //admin login
    @PostMapping("/login1")
    public ResponseEntity<User> login1(@RequestBody User user) {

        System.out.println("I am inside api");
        System.out.println(user);
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        User dbUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());

        if (existingUser.isPresent()) {
            String storedPassword = existingUser.get().getPassword();
            String decodedPassword = new String(Base64.getDecoder().decode(storedPassword), StandardCharsets.UTF_8);

            if (decodedPassword.equals(user.getPassword())) {
                User foundUser = existingUser.get();

                // Optionally, log the userId for debugging purposes
                System.out.println("Logged in User ID: " + foundUser.getId());  // Logs the userId

                // Return the entire User object, including userId (id field)
                return ResponseEntity.ok(foundUser);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Compare the stored password with the login request password (both are in plaintext)
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }


    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> passwordData) {
        String email = passwordData.get("email");
        String oldPassword = passwordData.get("oldPassword");
        String newPassword = passwordData.get("newPassword");
        String confirmPassword = passwordData.get("confirmPassword");

        // Validate that new password and confirm password match
        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("New password and confirm password do not match.");
        }

        Optional<User> dbUser = userRepository.findByEmail(email);
        if (dbUser.isPresent()) {
            User existingUser = dbUser.get();

            // Decode the stored password and compare with the provided old password
            String decodedStoredPassword = new String(Base64.getDecoder().decode(existingUser.getPassword()), StandardCharsets.UTF_8);
            if (!decodedStoredPassword.equals(oldPassword)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect.");
            }

            // Encode the new password and save it
            String encodedNewPassword = Base64.getEncoder().encodeToString(newPassword.getBytes(StandardCharsets.UTF_8));
            existingUser.setPassword(encodedNewPassword);
            userRepository.save(existingUser);

            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found.");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updateUser) {
        return userRepository.findById(id).map(user -> {
            user.setUserName(updateUser.getUserName());
            user.setEmail(updateUser.getEmail());
            user.setPhoneno(updateUser.getPhoneno());
            user.setAddress(updateUser.getAddress());
            user.setAdharno(updateUser.getAdharno());
            user.setDept(updateUser.getDept());
            user.setSemester(updateUser.getSemester());
            user.setRegno(updateUser.getRegno());
            user.setMomphoneno(updateUser.getMomphoneno());
            user.setDadphoneno(updateUser.getDadphoneno());
            user.setPanCardNumber(updateUser.getPanCardNumber());
            user.setBeMarksCardPath(updateUser.getBeMarksCardPath());
            user.setDegreeCertificatePath(updateUser.getDegreeCertificatePath());
            user.setSslcMarksCardPath(updateUser.getSslcMarksCardPath());
            user.setPhotoPath(updateUser.getPhotoPath());
            user.setStaffProfilePath(updateUser.getStaffProfilePath());
            user.setTransferCertificatePath(updateUser.getTransferCertificatePath());
            user.setStudsslcmarksCardPath(updateUser.getStudsslcmarksCardPath());
            user.setStudphotoPath(updateUser.getStudphotoPath());
            user.setStudyCertificatePath(updateUser.getStudyCertificatePath());
            user.setPhysicalFitnessPath(updateUser.getPhysicalFitnessPath());
            user.setMigrationCertificatePath(updateUser.getMigrationCertificatePath());
            user.setIncomeCertificatePath(updateUser.getIncomeCertificatePath());
            user.setCasteCertificatePath(updateUser.getCasteCertificatePath());


            userRepository.save(user);
            return ResponseEntity.ok().body("Staff updated successfully!");
        }).orElse(ResponseEntity.status(404).body("Staff not found"));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.status(404).body("User not found.");
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        try {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }

    @GetMapping("/staff")
    public ResponseEntity<List<User>> getAllStaff() {
        List<User> staff = userRepository.findByRole("Staff");
        if (staff.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(staff);
    }

    @GetMapping("/student")
    public ResponseEntity<List<User>> getAllStudent() {
        List<User> student = userRepository.findByRole("Student");
        if (student.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(student);
    }
   
    @GetMapping("/studentnew/{semester}")
    public ResponseEntity<List<User>> getAllStudentNew(@PathVariable String semester) {
        List<User> student = userRepository.findByRoleAndSemester("Student", semester);
        if (student.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(student);
    }

    @GetMapping("/student1")
    public ResponseEntity<User> getStudent1(@RequestParam String userName) {
        Optional<User> student = userRepository.findByUserName(userName);
        return student.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/student1/{userName}")
    public ResponseEntity<User> getStudent(@PathVariable String userName) {
        Optional<User> student = userRepository.findByUserName(userName);

        if (student.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(student.get());
    }


    @GetMapping("/student/photo/{fileName}")
    public ResponseEntity<Resource> getStudentPhoto(@PathVariable String fileName) {
        try {
            Path path = Paths.get("uploads/photos").resolve(fileName); // Path to the folder where photos are stored
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Adjust according to the file type
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
