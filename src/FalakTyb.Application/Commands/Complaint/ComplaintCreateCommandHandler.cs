
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ComplaintCreateCommandHandler : IRequestHandler<ComplaintCreateCommand, Complaint>
    {
        private IComplaintRepository _complaintRepository;

        public ComplaintCreateCommandHandler(
            IComplaintRepository complaintRepository)
        {
            _complaintRepository = complaintRepository;
        }

        public async Task<Complaint> Handle(ComplaintCreateCommand command, CancellationToken cancellationToken)
        {
  var Subject =  "  العنوان  : " + command.Complaint.Subject;
        var UserName =  command.Complaint.UserName+":   اسم المقدم" ;
         var Mobile =  command.Complaint.PhoneNumber+":   اسم المقدم" ;
        var title = " تم تقديم طلب شكوى جديدة . يرجى مراجعة المنصة لمزيد من التفاصيل.";


            var entity = await _complaintRepository.CreateOrUpdateAsync(command.Complaint);
            await _complaintRepository.SaveChangesAsync();


var _clientId ="B8EA758F140B4BE780EDC92B415341C5" ;

var _secretKey = "fnWe6YP795jPoB5z5z9T0J0IfZvtgl3cNQaCjP/OWyQ=";
    string credentials = $"{_clientId}:{_secretKey}";

byte[] bytes = Encoding.UTF8.GetBytes(credentials);

string Toke = Convert.ToBase64String(bytes); 



    try
    {
        var externalResourceUrl = "https://meiaservicesextst.islam.gov.qa/ServicesBrokerGatewayAPI/api/Email/Send";
        var authorizationHeader = "Basic "+Toke;

        // Create a HttpClient instance
        using (var httpClient = new HttpClient())
        {
            // Set the request headers
            httpClient.DefaultRequestHeaders.Add("accept", "*/*");
            httpClient.DefaultRequestHeaders.Add("Accept-Language", "ar-QA");
            httpClient.DefaultRequestHeaders.Add("Authorization", authorizationHeader);

            // Create the form data
       // Create the JSON data
var jsonData = new
{
    toEmailAddressesList = new string[] {""},
    subject = "تنبيه تطبيق فالك",

 message = title+"<br/>"+
          Subject +"<br/>" +
              UserName+"<br/>" 
              


};

// Serialize the JSON data to a string
var json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonData);

// Create the content for the POST request
var content = new StringContent(json, Encoding.UTF8, "application/json");

// Send the POST request with the content
var response = await httpClient.PostAsync(externalResourceUrl, content);



        }
    }
    catch (Exception ex){


    }




            return entity;
        }
    }
}
