using Microsoft.Extensions.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using awqaf.Domain;
using awqaf.Application.Queries;
using awqaf.Application.Commands;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Linq;
using awqaf.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
//import WebClient
using System.Net;

//import JsonConvert
using Newtonsoft.Json;

using System.Threading;

using JHipsterNet.Core.Pagination;

using awqaf.Crosscutting.Exceptions;

using awqaf.Web.Rest.Utilities;




using  awqaf;

namespace awqaf.Jobs
{
   public  class NotificationJob : IJob
    {
          private readonly ILogger<NotificationJob> _logger;
        public NotificationJob(ILogger<NotificationJob> logger)
        {
            this._logger = logger;
        }
  
   private readonly IMediator _mediator;
        public NotificationJob(
            IMediator mediator)
        {
         
            _mediator =  mediator;
        }





        public  Task Execute(IJobExecutionContext context)
        {

 
                    dynamic body = new
                    {
                        username = "admin",
                        password = "admin",
                        

                    };


                    using (WebClient client = new WebClient())
                    {
                        client.Headers.Add("accept", "application/json");
                        client.Headers.Add("accept-encoding", "gzip, deflate");
                        client.Headers.Add("Content-Type", "application/json");
                        //var response = client.UploadString("http://192.168.1.2:5000/api/authenticate", JsonConvert.SerializeObject(body));
 //client.Headers.Add("Authorization", "Bearer "+JsonConvert.DeserializeObject(response).id_token.ToString());

                

  // var response2 = client.DownloadString("http://192.168.1.2:5000/api/contracts/checker/expiration");









                    }
           










            
            return Task.CompletedTask;
        }
    }
}
