public with sharing class VerifyPatient {
    @AuraEnabled
    public static void verifyPatientRecord(String recordId){
        if(recordId != null){
            Contact contactRecord = [select id,verified__c from Contact where id = :recordId limit 1];
            contactRecord.verified__c = true;
            update contactRecord;
        }
    }
}