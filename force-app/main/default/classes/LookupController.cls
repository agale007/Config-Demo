public with sharing class LookupController {

    private final static Integer MAX_RESULTS = 5;

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> search(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        // We're not using anOptionalParam parameter
        // it's just here to demonstrate custom params
        
        // Prepare query paramters
        searchTerm += '*';

        // Execute search query
        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
            Account (Id, Name, BillingCity WHERE id NOT IN :selectedIds),
            Opportunity (Id, Name, StageName WHERE id NOT IN :selectedIds),
            DoctorHospital__c(Id,Doctor__c,Hospital__c,DoctorHospital__c WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        // Prepare results
        List<LookupSearchResult> results = new List<LookupSearchResult>();

        // Extract Accounts & convert them into LookupSearchResult
        String accountIcon = 'standard:account';
        Account [] accounts = ((List<Account>) searchResults[0]);
        for (Account account : accounts) {
            results.add(new LookupSearchResult(account.Id, 'Account', accountIcon, account.Name, 'Account • '+ account.BillingCity));
        }

        // Extract Opportunities & convert them into LookupSearchResult
        String opptyIcon = 'standard:opportunity';
        Opportunity [] opptys = ((List<Opportunity>) searchResults[1]);
        for (Opportunity oppty : opptys) {
            results.add(new LookupSearchResult(oppty.Id, 'Opportunity', opptyIcon, oppty.Name, 'Opportunity • '+ oppty.StageName));
        }
       // Extract DoctorHospital__c & convert them into LookupSearchResult
        String doctorHosJunIcon = 'custom:custom58';
        DoctorHospital__c []  doctorHosRec= ((List<DoctorHospital__c>) searchResults[2]);
        for (DoctorHospital__c doctorHosRecs : doctorHosRec) {
         results.add(new LookupSearchResult(doctorHosRecs.Id, 'DoctorHospital__c', doctorHosJunIcon, doctorHosRecs.DoctorHospital__c,''));
       }


        return results;
    }
}