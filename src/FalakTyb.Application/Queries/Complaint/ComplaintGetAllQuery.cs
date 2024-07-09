
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ComplaintGetAllQuery : IRequest<IPage<Complaint>>
    {
        public IPageable Page { get; set; }
    }
}
