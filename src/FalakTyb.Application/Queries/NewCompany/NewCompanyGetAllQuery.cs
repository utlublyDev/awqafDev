
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class NewCompanyGetAllQuery : IRequest<IPage<NewCompany>>
    {
        public IPageable Page { get; set; }
    }
}
