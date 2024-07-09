
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class SubProvidersGetAllQuery : IRequest<IPage<SubProviders>>
    {
        public IPageable Page { get; set; }
    }
}
