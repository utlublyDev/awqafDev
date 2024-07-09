
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ComplaintGetQuery : IRequest<Complaint>
    {
        public long Id { get; set; }
    }
}
