
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class SavedProvidersGetAllQuery : IRequest<IPage<SavedProviders>>
    {
        public IPageable Page { get; set; }
    }
}
