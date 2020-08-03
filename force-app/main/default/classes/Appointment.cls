<<<<<<< HEAD
//demo
=======
//prashant
>>>>>>> b11bd2e9755f13c96d937f840ed7df812128c001
public with sharing class Appointment {
    public Appointment() {

    }
    @AuraEnabled
    public static String getSpecialist() {
         return JSON.serialize(Doctor__c.Specialist__c.getDescribe().getPicklistValues());
    }

    
    @AuraEnabled(cacheable=true)
    public static void createPatientAppoinment(visit__c visit) {
        /*try{

            //visit.
        }catch(Exception e) {
            throw new AuraHandledException('Not Scheduled!!!');
        }*/
    }
}
