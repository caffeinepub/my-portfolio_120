import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  // Authorization Setup
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System (required by frontend)
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Portfolio Profile Data
  type Profile = {
    name : Text;
    title : Text;
    bio : Text;
    email : Text;
    location : Text;
  };

  var profile : Profile = {
    name = "Nick";
    title = "Your Title";
    bio = "Short bio goes here";
    email = "contact@example.com";
    location = "Earth";
  };

  // Projects
  type Project = {
    id : Text;
    title : Text;
    description : Text;
    tags : [Text];
    imageUrl : Text;
    projectUrl : Text;
  };

  module Project {
    public func compare(p1 : Project, p2 : Project) : Order.Order {
      Text.compare(p1.id, p2.id);
    };
  };

  let projects = Map.empty<Text, Project>();

  // Skills
  type Skill = {
    id : Text;
    name : Text;
    description : Text;
    iconName : Text;
  };

  module Skill {
    public func compare(s1 : Skill, s2 : Skill) : Order.Order {
      Text.compare(s1.id, s2.id);
    };
  };

  let skills = Map.empty<Text, Skill>();

  // Contact Messages
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  let contactMessages = Map.empty<Nat, ContactMessage>();
  var nextMessageId = 0;

  // Profile Functions
  public query ({ caller }) func getProfile() : async Profile {
    profile;
  };

  public shared ({ caller }) func updateProfile(newProfile : Profile) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the owner can update the profile");
    };
    profile := newProfile;
  };

  // Projects Functions
  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.values().toArray().sort();
  };

  public query ({ caller }) func getProject(id : Text) : async Project {
    switch (projects.get(id)) {
      case (null) { Runtime.trap("Project not found") };
      case (?project) { project };
    };
  };

  public shared ({ caller }) func addProject(project : Project) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the owner can add projects");
    };
    if (projects.containsKey(project.id)) { Runtime.trap("Project ID already exists") };
    projects.add(project.id, project);
  };

  public shared ({ caller }) func updateProject(project : Project) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the owner can update projects");
    };
    if (not projects.containsKey(project.id)) { Runtime.trap("Project not found") };
    projects.add(project.id, project);
  };

  public shared ({ caller }) func deleteProject(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the owner can delete projects");
    };
    if (not projects.containsKey(id)) { Runtime.trap("Project not found") };
    projects.remove(id);
  };

  // Skills Functions
  public query ({ caller }) func getAllSkills() : async [Skill] {
    skills.values().toArray().sort();
  };

  public query ({ caller }) func getSkill(id : Text) : async Skill {
    switch (skills.get(id)) {
      case (null) { Runtime.trap("Skill not found") };
      case (?skill) { skill };
    };
  };

  public shared ({ caller }) func addSkill(skill : Skill) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the owner can add skills");
    };
    if (skills.containsKey(skill.id)) { Runtime.trap("Skill ID already exists") };
    skills.add(skill.id, skill);
  };

  public shared ({ caller }) func updateSkill(skill : Skill) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the owner can update skills");
    };
    if (not skills.containsKey(skill.id)) { Runtime.trap("Skill not found") };
    skills.add(skill.id, skill);
  };

  public shared ({ caller }) func deleteSkill(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the owner can delete skills");
    };
    if (not skills.containsKey(id)) { Runtime.trap("Skill not found") };
    skills.remove(id);
  };

  // Contact Messages Functions
  public shared ({ caller }) func submitContactMessage(message : ContactMessage) : async () {
    contactMessages.add(nextMessageId, message);
    nextMessageId += 1;
  };

  public shared ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the owner can view messages");
    };
    contactMessages.values().toArray();
  };
};
