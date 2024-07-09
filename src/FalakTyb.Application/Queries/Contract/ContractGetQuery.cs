
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ContractGetQuery : IRequest<Contract>
    {
        public long Id { get; set; }
    }
}
