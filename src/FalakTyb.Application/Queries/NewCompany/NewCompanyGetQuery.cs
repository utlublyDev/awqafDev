
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class NewCompanyGetQuery : IRequest<NewCompany>
    {
        public long Id { get; set; }
    }
}
