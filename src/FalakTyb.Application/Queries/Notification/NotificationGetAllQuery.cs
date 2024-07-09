
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class NotificationGetAllQuery : IRequest<IPage<Notification>>
    {
        public IPageable Page { get; set; }
    }
}
