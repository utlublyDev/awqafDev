
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class RedeemGetAllQuery : IRequest<IPage<Redeem>>
    {
        public IPageable Page { get; set; }
    }
}
