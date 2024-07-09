
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ProvidersCategoriesGetAllQuery : IRequest<IPage<ProvidersCategories>>
    {
        public IPageable Page { get; set; }
    }
}
