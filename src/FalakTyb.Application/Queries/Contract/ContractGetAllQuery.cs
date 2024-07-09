
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ContractGetAllQuery : IRequest<IPage<Contract>>
    {
        public IPageable Page { get; set; }
    }
}
