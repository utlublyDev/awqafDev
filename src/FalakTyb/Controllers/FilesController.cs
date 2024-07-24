
using MediatR;
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using awqaf.Domain;
using awqaf.Crosscutting.Exceptions;
using awqaf.Web.Extensions;
using awqaf.Web.Filters;
using awqaf.Web.Rest.Utilities;
using awqaf.Application.Queries;
using awqaf.Application.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Quartz;
using System;
using System.Net;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.IO;
using System.Net.Http;
using System.Text.Json;
namespace awqaf.Controllers
{
    
    [Route("api/AwqafFiles")]
    [ApiController]
    public class FilesController : ControllerBase
    {

        //: ControllerBase,IJob
        private const string EntityName = "Files";
        private readonly ILogger<ContractsController> _log;
        private readonly IMediator _mediator;
[HttpPost]
public async Task<string>  PostData(IFormFile file)
{
var _clientId ="B8EA758F140B4BE780EDC92B415341C5" ;

var _secretKey = "fnWe6YP795jPoB5z5z9T0J0IfZvtgl3cNQaCjP/OWyQ=";
    string credentials = $"{_clientId}:{_secretKey}";

byte[] bytes = Encoding.UTF8.GetBytes(credentials);

string Toke = Convert.ToBase64String(bytes); 

Console.WriteLine(Toke);

    try
    {
        var externalResourceUrl = "https://meiaservicesextst.islam.gov.qa/ServicesBrokerGatewayAPI/api/File/Upload/file?uplodFolderPath=falaktayab/";
        var authorizationHeader = "Basic "+Toke;

        // Create a HttpClient instance
        using (var httpClient = new HttpClient())
        {
            // Set the request headers
            httpClient.DefaultRequestHeaders.Add("accept", "*/*");
            httpClient.DefaultRequestHeaders.Add("Accept-Language", "ar-QA");
            httpClient.DefaultRequestHeaders.Add("Authorization", authorizationHeader);

            // Create the form data
            var formData = new MultipartFormDataContent();
            
            
                var fileContent = new StreamContent(file.OpenReadStream());
                fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(file.ContentType);
                formData.Add(fileContent, "formFile", file.FileName);
      

            // Send the POST request to the external resource
            var response = await httpClient.PostAsync(externalResourceUrl, formData);

            // Handle the response from the external resource
            if (response.IsSuccessStatusCode)
            {
                
                return response.Content.ReadAsStringAsync().Result;
            }
            else
            {
                return "BadRequest";
            }
        }
    }
    catch (Exception ex)
    {
        // Handle any exceptions that occur during the request
        return "StatusCode 500";
    }

        

        








      

     
}

[HttpGet("get/fileData")]
public async Task<Stream>  GetData(string FileName)
{
var _clientId ="B8EA758F140B4BE780EDC92B415341C5" ;

var _secretKey = "fnWe6YP795jPoB5z5z9T0J0IfZvtgl3cNQaCjP/OWyQ=";
    string credentials = $"{_clientId}:{_secretKey}";

byte[] bytes = Encoding.UTF8.GetBytes(credentials);

string Toke = Convert.ToBase64String(bytes); 

Console.WriteLine(Toke);

    try
    {
        var externalResourceUrl = "https://meiaservicesextst.islam.gov.qa/ServicesBrokerGatewayAPI/api/File/FileResult/"+FileName+"?FolderName=falaktayab";
        var authorizationHeader = "Basic "+Toke;

        // Create a HttpClient instance
        using (var httpClient = new HttpClient())
        {
            // Set the request headers
            httpClient.DefaultRequestHeaders.Add("accept", "*/*");
            httpClient.DefaultRequestHeaders.Add("Accept-Language", "ar-QA");
            httpClient.DefaultRequestHeaders.Add("Authorization", authorizationHeader);

            // Create the form data
           
            
            
           
      

            // Send the POST request to the external resource
            var response = await httpClient.PostAsync(externalResourceUrl,null);

            // Handle the response from the external resource
            if (response.IsSuccessStatusCode)
            {
                
                return response.Content.ReadAsStreamAsync().Result;
            }
            else
            {
                return null;
            }
        }
    }
    catch (Exception ex)
    {
        // Handle any exceptions that occur during the request
        return null;
    }

        

        








      

     
}

    }





    
}
