using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Net.Http;
//import WebClient
using System.Net;
using System.Text;
//import JsonConvert
using Newtonsoft.Json;

namespace awqaf.Application.Commands
{
    public class CreatePushNotificationsToEmployeeCommandHandler : IRequestHandler<CreatePushNotificationsToEmployeeCommand, PushNotifications>
    {
        private readonly UserManager<User> _userManager;
        private IPushNotificationsRepository _pushNotificationsRepository;

        public CreatePushNotificationsToEmployeeCommandHandler(
            IPushNotificationsRepository pushNotificationsRepository, UserManager<User> userManager)
        {
            _pushNotificationsRepository = pushNotificationsRepository;
            _userManager = userManager;

        }

        public async Task<PushNotifications> Handle(CreatePushNotificationsToEmployeeCommand command, CancellationToken cancellationToken)
        {

            var users = _userManager.Users;
            //loop to users and get the user id
            foreach (var user in users)
            {

                if (user.NotificationSetting == true && user.NotificationExpoKey != "")
                {


                    dynamic body = new
                    {
                        to = user.NotificationExpoKey,
                        title = command.PushNotifications.Header,
                        body = command.PushNotifications.Details,

                    };


                    using (WebClient client = new WebClient())
                    {
                        client.Headers.Add("accept", "application/json");
                        client.Headers.Add("accept-encoding", "gzip, deflate");
                        client.Headers.Add("Content-Type", "application/json");
                        var response = client.UploadString("https://exp.host/--/api/v2/push/send", JsonConvert.SerializeObject(body));


                    }



                }

            }


            var entity = await _pushNotificationsRepository.CreateOrUpdateAsync(command.PushNotifications);
            await _pushNotificationsRepository.SaveChangesAsync();
            return entity;
        }
    }
}
