
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class PushNotificationsGetAllQuery : IRequest<IPage<PushNotifications>>
    {
        public IPageable Page { get; set; }
    }
}
