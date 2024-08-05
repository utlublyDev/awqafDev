
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Http;

namespace awqaf.Application.Queries
{
    public class GetAllContractsExpirationQueryHandler : IRequestHandler<GetAllContractsExpirationQuery, IEnumerable<ContractRespose>>
    {
        private IReadOnlyContractRepository _contractRepository;
            private IProvidersRepository _providersRepository;
           private IContractRepository _contractRepositoryupdate;
        public GetAllContractsExpirationQueryHandler(
            IReadOnlyContractRepository contractRepository,IProvidersRepository providersRepository,IContractRepository contractRepositoryupdate)
        {
            _contractRepository = contractRepository;
           _providersRepository  = providersRepository;
           _contractRepositoryupdate = contractRepositoryupdate;
        }

        public async Task<IEnumerable<ContractRespose>> Handle(GetAllContractsExpirationQuery request, CancellationToken cancellationToken)
        {

            var page = await _contractRepository.QueryHelper()
                .Include(contract => contract.Providers).GetAllAsync();
var SendEmailFlag = false;
            List<ContractRespose> exContract = new List<ContractRespose>();
            foreach (Contract contract in page)
            {

                if (contract.ContractEndDate < DateTime.Now)
                {
                    SendEmailFlag = true;
                  contract.Providers.IsActive = false;
                   contract.Status = false;
                    var entity = await _providersRepository.CreateOrUpdateAsync(contract.Providers);
                  await _providersRepository.SaveChangesAsync();
                var entityContract = await _contractRepositoryupdate.CreateOrUpdateAsync(contract);
                 await _contractRepositoryupdate.SaveChangesAsync();
                  


                }


            }






if(SendEmailFlag==true)
{


var _clientId ="B8EA758F140B4BE780EDC92B415341C5" ;

var _secretKey = "fnWe6YP795jPoB5z5z9T0J0IfZvtgl3cNQaCjP/OWyQ=";
    string credentials = $"{_clientId}:{_secretKey}";

byte[] bytes = Encoding.UTF8.GetBytes(credentials);

string Toke = Convert.ToBase64String(bytes); 

Console.WriteLine(Toke);

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
    message = "يرجى التحقق من العقود، حيث أن بعض العقود قد انتهت صلاحيتها."
};

// Serialize the JSON data to a string
var json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonData);

// Create the content for the POST request
var content = new StringContent(json, Encoding.UTF8, "application/json");

// Send the POST request with the content
var response = await httpClient.PostAsync(externalResourceUrl, content);


               
      


           

            // Handle the response from the external resource
           
        }
    }
    catch (Exception ex)
    {
       
    }






}










return exContract;

        }
    }
}
